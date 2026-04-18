"use client";
import { useState, useMemo, useEffect } from 'react';
import { glassProducts } from '@/data/glassProducts';
import { alliedProducts } from '@/data/alliedProducts';
import { useToast } from '@/components/ToastProvider';
import { useRole } from '@/components/RoleProvider';

export default function EstimatePage() {
  const { showToast } = useToast();
  const { role } = useRole();
  const [formData, setFormData] = useState({
    glassTypeId: glassProducts[0]?.id || 1,
    width: 1000,
    height: 1000,
    quantity: 1,
    selectedAllied: []
  });

  const [showModal, setShowModal] = useState(false);
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString());
  }, []);

  const selectedGlass = useMemo(() => 
    glassProducts.find(p => p.id === parseInt(formData.glassTypeId))
  , [formData.glassTypeId]);

  const calculations = useMemo(() => {
    if (!selectedGlass) return null;
    const sqft = (formData.width * formData.height) / 92903.04;
    const totalSqft = sqft * formData.quantity;
    const midPrice = (selectedGlass.priceMin + selectedGlass.priceMax) / 2;
    const basePrice = midPrice * totalSqft;
    const discountMap = { 'Homeowner': 0, 'Architect': 0.05, 'Builder': 0.08, 'Dealer': 0.12 };
    const discountRate = discountMap[role || 'Homeowner'] || 0;
    const discountAmount = basePrice * discountRate;
    let alliedCost = 0;
    formData.selectedAllied.forEach(id => {
      const product = alliedProducts.find(p => p.id === id);
      if (product?.name === 'UPVC Frame') alliedCost += 350 * totalSqft;
      else if (product?.name === 'Structural Silicone') alliedCost += 450 * formData.quantity;
      else alliedCost += 2500 * formData.quantity;
    });
    const netAmount = basePrice - discountAmount + alliedCost;
    const gst = netAmount * 0.18;
    const total = netAmount + gst;
    return {
      sqftPerPanel: sqft.toFixed(2),
      totalSqft: totalSqft.toFixed(2),
      basePrice: Math.round(basePrice),
      discountAmount: Math.round(discountAmount),
      alliedCost: Math.round(alliedCost),
      gst: Math.round(gst),
      total: Math.round(total),
      ratePerSqft: midPrice
    };
  }, [formData, selectedGlass, role]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      const id = parseInt(value);
      setFormData(prev => ({
        ...prev,
        selectedAllied: checked 
          ? [...prev.selectedAllied, id] 
          : prev.selectedAllied.filter(x => x !== id)
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handlePrint = () => {
    showToast("Generating professional estimate PDF...");
    setTimeout(() => window.print(), 500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-24 pb-20 print:bg-white print:pt-0">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="w-full lg:w-1/3 space-y-8 print:hidden">
            <div className="bg-slate-900/50 backdrop-blur-sm p-8 rounded-[2rem] border border-slate-800">
              <h2 className="text-2xl font-black text-white mb-8">Estimate Parameters</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-black uppercase text-slate-400 mb-3 tracking-widest">Glass Type</label>
                  <select name="glassTypeId" value={formData.glassTypeId} onChange={handleInputChange} className="w-full p-4 bg-slate-800 border border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 font-bold text-white">
                    {glassProducts.map(p => <option key={p.id} value={p.id}>{p.name} ({p.thickness})</option>)}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black uppercase text-slate-400 mb-3 tracking-widest">Width (mm)</label>
                    <input type="number" name="width" value={formData.width} onChange={handleInputChange} className="w-full p-4 bg-slate-800 border border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 font-bold text-white"/>
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase text-slate-400 mb-3 tracking-widest">Height (mm)</label>
                    <input type="number" name="height" value={formData.height} onChange={handleInputChange} className="w-full p-4 bg-slate-800 border border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 font-bold text-white"/>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-black uppercase text-slate-400 mb-3 tracking-widest">Quantity (Panels)</label>
                  <input type="number" name="quantity" value={formData.quantity} onChange={handleInputChange} className="w-full p-4 bg-slate-800 border border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 font-bold text-white"/>
                </div>
                <div>
                  <label className="block text-xs font-black uppercase text-slate-400 mb-3 tracking-widest">Selected Customer Role</label>
                  <div className="w-full p-5 bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-xl font-black text-white">
                    {role || 'Homeowner'}
                    <div className="text-[11px] text-slate-400 mt-1 font-bold">
                      Discount: {(({ 'Homeowner': 0, 'Architect': 5, 'Builder': 8, 'Dealer': 12 })[role] || 0)}%
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-black uppercase text-slate-400 mb-5 tracking-widest">Allied Products</label>
                  <div className="space-y-3">
                    {alliedProducts.map(product => (
                      <label key={product.id} className="flex items-center gap-4 cursor-pointer group">
                        <input type="checkbox" value={product.id} checked={formData.selectedAllied.includes(product.id)} onChange={handleInputChange} className="w-6 h-6 rounded-lg border-slate-600 bg-slate-800 text-amber-500 focus:ring-amber-500 cursor-pointer" />
                        <span className="text-sm font-semibold text-slate-300 group-hover:text-white transition-colors">{product.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className="bg-slate-900/70 backdrop-blur-sm rounded-[3rem] shadow-2xl overflow-hidden border border-slate-800 print:shadow-none print:border-none">
              <div className="bg-gradient-to-r from-slate-900 to-slate-950 p-10 text-white flex flex-col md:flex-row justify-between items-start gap-6">
                <div>
                  <div className="text-3xl md:text-4xl font-black mb-3 tracking-tighter">GlassIQ Estimate</div>
                  <p className="text-amber-400 text-sm font-bold uppercase tracking-widest">Architectural Glass Solution</p>
                </div>
                <div className="text-left md:text-right">
                  <p className="text-xs text-slate-500 uppercase font-medium mb-1">Issue Date</p>
                  <p className="font-bold text-lg">{currentDate || "--/--/----"}</p>
                </div>
              </div>
              <div className="p-10 md:p-12 space-y-12">
                <div className="overflow-x-auto no-scrollbar -mx-4 md:mx-0">
                  <table className="w-full text-left min-w-[500px]">
                    <thead><tr className="border-b-2 border-slate-700 text-[11px] font-black uppercase text-slate-400 tracking-widest"><th className="pb-5 md:px-0">Material Description</th><th className="pb-5 md:px-0">Qty</th><th className="pb-5 md:px-0">Rate (₹/sqft)</th><th className="pb-5 text-right md:px-0">Total (₹)</th></tr></thead>
                    <tbody className="divide-y divide-slate-700">
                      <tr className="group">
                        <td className="py-7 md:px-0"><p className="font-black text-white text-lg md:text-xl">{selectedGlass?.name} Glass</p><p className="text-xs md:text-sm text-slate-400">{formData.width}mm x {formData.height}mm | {calculations?.totalSqft} sq.ft total</p><p className="text-xs md:text-sm text-slate-500 uppercase mt-1">Config: {selectedGlass?.thickness} • {selectedGlass?.process}</p></td>
                        <td className="py-7 md:px-0 font-bold text-white text-lg">{formData.quantity}</td><td className="py-7 md:px-0 font-bold text-white text-lg">₹{calculations?.ratePerSqft}</td><td className="py-7 text-right md:px-0 font-black text-amber-400 text-xl md:text-2xl">₹{calculations?.basePrice}</td>
                      </tr>
                      {formData.selectedAllied.length > 0 && (
                        <tr><td className="py-7 md:px-0" colSpan="3"><p className="font-bold text-white">Selected Allied Products</p><p className="text-xs text-slate-400">{formData.selectedAllied.map(id => alliedProducts.find(p => p.id === id)?.name).join(', ')}</p></td><td className="py-7 text-right md:px-0 font-bold text-white">₹{calculations?.alliedCost}</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="flex justify-end pt-10">
                  <div className="w-full md:w-96 space-y-5">
                    <div className="flex justify-between text-base text-slate-400"><span>Subtotal</span><span className="font-bold text-white">₹{calculations?.basePrice + (calculations?.alliedCost || 0)}</span></div>
                    {calculations?.discountAmount > 0 && (
                      <div className="flex justify-between text-base text-emerald-400 font-bold bg-emerald-500/10 px-5 py-3 rounded-xl"><span>{role || 'Homeowner'} Discount</span><span>- ₹{calculations?.discountAmount}</span></div>
                    )}
                    <div className="flex justify-between text-base text-slate-400 border-t border-slate-700 pt-5"><span>GST (18%)</span><span className="font-bold text-white">₹{calculations?.gst}</span></div>
                    <div className="flex justify-between text-3xl font-black text-white border-t-2 border-amber-500/30 pt-6"><span>Grand Total</span><span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-400">₹{calculations?.total}</span></div>
                  </div>
                </div>
                <div className="bg-slate-800/30 p-6 rounded-2xl border border-slate-700"><p className="text-xs text-slate-400 font-black uppercase tracking-widest mb-2">Legal Disclaimer</p><p className="text-sm text-slate-500 italic">Rates are indicative and subject to change based on actual site measurements. Final quote issued by vendor after physical inspection.</p></div>
                <div className="flex flex-col sm:flex-row gap-5 pt-12 print:hidden">
                  <button onClick={handlePrint} className="flex-1 bg-slate-800 text-white border-2 border-slate-700 px-8 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-700 hover:border-slate-600 transition-all flex items-center justify-center gap-3">Download Estimate</button>
                  <button onClick={() => setShowModal(true)} className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 px-8 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:from-amber-400 hover:to-orange-400 transition-all shadow-lg flex items-center justify-center gap-3">Request Formal Quote</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl" onClick={() => setShowModal(false)}></div>
          <div className="bg-slate-900 rounded-[2.5rem] p-10 max-w-md w-full relative z-10 shadow-2xl border border-slate-800">
            <h3 className="text-3xl font-black text-white mb-4">Finalize Quote</h3>
            <p className="text-slate-400 mb-10">Enter your details for our expert to schedule a site measurement.</p>
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); showToast("Formal request sent to 3 local factories!"); setShowModal(false); }}>
              <div><label className="block text-xs font-black uppercase text-slate-500 mb-3 tracking-widest">Full Name</label><input required className="w-full p-5 bg-slate-800 rounded-xl border border-slate-700 outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 font-bold text-white placeholder-slate-600" /></div>
              <div><label className="block text-xs font-black uppercase text-slate-500 mb-3 tracking-widest">WhatsApp Number</label><input required className="w-full p-5 bg-slate-800 rounded-xl border border-slate-700 outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 font-bold text-white placeholder-slate-600" /></div>
              <button type="submit" className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 py-5 rounded-2xl font-black uppercase tracking-widest text-base hover:from-amber-400 hover:to-orange-400 shadow-xl">Send Fast Request</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
